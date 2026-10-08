const https = require('https');
const fs = require('fs');
const path = require('path');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const OWNER = 'couto-wlp';
const REPO = 'aluguel-de-cacambas-guarulhos';
const BRANCH = 'main';

function apiRequest(method, apiPath, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: apiPath,
      method: method,
      headers: {
        'User-Agent': 'Node-GitHub-Sync',
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data || '{}'));
        } else {
          reject(new Error(`GitHub API ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === '.astro' || file === 'dist' || file === '.vercel' || file === 'scripts') continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function push() {
  console.log('1. Fetching latest commit info...');
  const refRes = await apiRequest('GET', `/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`);
  const latestCommitSha = refRes.object.sha;
  
  const commitRes = await apiRequest('GET', `/repos/${OWNER}/${REPO}/git/commits/${latestCommitSha}`);
  const baseTreeSha = commitRes.tree.sha;

  console.log('2. Reading workspace files...');
  const files = getAllFiles('.');
  const tree = [];

  for (const filePath of files) {
    const relativePath = filePath.replace(/\\/g, '/');
    const content = fs.readFileSync(filePath);
    
    // Create blob for binary or text file
    const isText = !/\.(webp|png|jpg|jpeg|ico|gif|woff2?|ttf|eot)$/i.test(filePath);
    const blobData = {
      content: content.toString(isText ? 'utf8' : 'base64'),
      encoding: isText ? 'utf8' : 'base64'
    };

    const blobRes = await apiRequest('POST', `/repos/${OWNER}/${REPO}/git/blobs`, blobData);
    tree.push({
      path: relativePath,
      mode: '100644',
      type: 'blob',
      sha: blobRes.sha
    });
    console.log(`Uploaded blob for ${relativePath}`);
  }

  console.log('3. Creating new git tree...');
  const newTreeRes = await apiRequest('POST', `/repos/${OWNER}/${REPO}/git/trees`, {
    base_tree: baseTreeSha,
    tree: tree
  });

  console.log('4. Creating commit...');
  const newCommitRes = await apiRequest('POST', `/repos/${OWNER}/${REPO}/git/commits`, {
    message: 'perf: optimize images (WebP), remove render-blocking fonts, preload hero mobile bg, set lazy loading and image dimensions',
    tree: newTreeRes.sha,
    parents: [latestCommitSha]
  });

  console.log('5. Updating branch reference...');
  await apiRequest('PATCH', `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    sha: newCommitRes.sha,
    force: true
  });

  console.log('Success! Commit pushed to GitHub:', newCommitRes.sha);
}

push().catch(err => {
  console.error('Push failed:', err.message);
});

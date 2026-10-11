/**
 * Fetch and render starred repositories from events.json
 */
async function loadRepositories() {
  const listContainer = document.getElementById('repositories-list');
  
  try {
    // Show loading state
    listContainer.innerHTML = '<li class="loading">Loading repositories...</li>';
    
    // Fetch the events.json file
    const response = await fetch('events.json');
    
    if (!response.ok) {
      throw new Error(`Failed to load events.json: ${response.statusText}`);
    }
    
    const repositories = await response.json();
    
    // Clear the loading message
    listContainer.innerHTML = '';
    
    // Render each repository
    repositories.forEach(repo => {
      const listItem = createRepositoryItem(repo);
      listContainer.appendChild(listItem);
    });
    
  } catch (error) {
    console.error('Error loading repositories:', error);
    listContainer.innerHTML = `<li class="error">Error loading repositories: ${error.message}</li>`;
  }
}

/**
 * Create a repository list item element
 * @param {Object} repo - Repository data
 * @returns {HTMLElement} - List item element
 */
function createRepositoryItem(repo) {
  const listItem = document.createElement('li');
  listItem.className = 'repo-item';
  
  // Format the starred date
  const starredDate = new Date(repo.starredAt);
  const formattedDate = starredDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Format stars count with commas
  const starsFormatted = repo.stars.toLocaleString();
  
  listItem.innerHTML = `
    <div class="repo-name">
      <a href="${repo.url}" target="_blank" rel="noopener noreferrer">${repo.repo}</a>
    </div>
    <div class="repo-description">${repo.description}</div>
    <div class="repo-meta">
      <span class="repo-date">Starred: ${formattedDate}</span>
      <span class="repo-stars">⭐ ${starsFormatted} stars</span>
    </div>
  `;
  
  return listItem;
}

// Load repositories when the page is ready
document.addEventListener('DOMContentLoaded', loadRepositories);

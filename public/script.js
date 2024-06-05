document.getElementById('searchButton').addEventListener('click', async () => {
  performSearch();
});

document.getElementById('wordInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
      performSearch();
  }
});

async function performSearch() {
  const word = document.getElementById('wordInput').value;
  const definitionDiv = document.getElementById('definition');

  if (!word) {
      definitionDiv.innerHTML = '<p>Please enter a word.</p>';
      return;
  }

  try {
      const response = await fetch(`/api/define/${word}`);
      const data = await response.json();

      if (response.ok) {
          const meanings = data[0].meanings.map(meaning => {
              return `<p><strong>${meaning.partOfSpeech}</strong>: ${meaning.definitions[0].definition}</p>`;
          }).join('');

          definitionDiv.innerHTML = meanings;
      } else {
          definitionDiv.innerHTML = '<p>No definition found.</p>';
      }
  } catch (error) {
      definitionDiv.innerHTML = '<p>An error occurred while fetching the definition.</p>';
  }
}

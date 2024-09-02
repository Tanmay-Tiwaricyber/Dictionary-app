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
    const loadingIndicator = document.getElementById('loading');

    if (!word) {
        definitionDiv.innerHTML = '<p>Please enter a word.</p>';
        return;
    }

    loadingIndicator.style.display = 'block';

    try {
        const response = await fetch(`/api/define/${word}`);
        const data = await response.json();

        if (response.ok) {
            const meanings = data[0].meanings.map(meaning => {
                const examples = meaning.definitions[0].example ? `<p><strong>Example:</strong> ${meaning.definitions[0].example}</p>` : '';
                return `
                    <div class="meaning">
                        <p><strong>${meaning.partOfSpeech}</strong>: ${meaning.definitions[0].definition}</p>
                        ${examples}
                    </div>
                `;
            }).join('');

            definitionDiv.innerHTML = `<h2>Definitions:</h2>${meanings}`;
        } else {
            definitionDiv.innerHTML = '<p>No definition found.</p>';
        }
    } catch (error) {
        definitionDiv.innerHTML = '<p>An error occurred while fetching the definition.</p>';
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

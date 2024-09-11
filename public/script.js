document.getElementById('searchButton').addEventListener('click', async () => {
    performSearch();
});

document.getElementById('wordInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

document.getElementById('wordOfTheDayButton').addEventListener('click', async () => {
    fetchWordOfTheDay();
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

        if (response.ok && data.length > 0) {
            const meanings = data[0].meanings.map(meaning => {
                const examples = meaning.definitions[0].example ? `<p><strong>Example:</strong> ${meaning.definitions[0].example}</p>` : '';
                const synonyms = meaning.synonyms && meaning.synonyms.length ? `<p><strong>Synonyms:</strong> ${meaning.synonyms.join(', ')}</p>` : '';
                return `
                    <div class="meaning">
                        <p><strong>${meaning.partOfSpeech}</strong>: ${meaning.definitions[0].definition}</p>
                        ${examples}
                        ${synonyms}
                    </div>
                `;
            }).join('');

            definitionDiv.innerHTML = `
                <h2>Definitions for "${word}":</h2>${meanings}
                <button id="speakButton" style="margin-top: 10px;">🔊 Speak</button>
            `;

            // Add event listener to the Speak button for the searched word
            document.getElementById('speakButton').addEventListener('click', () => {
                speakWord(word);
            });

        } else {
            definitionDiv.innerHTML = '<p>No definition found.</p>';
        }
    } catch (error) {
        definitionDiv.innerHTML = '<p>An error occurred while fetching the definition.</p>';
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

async function fetchWordOfTheDay() {
    const definitionDiv = document.getElementById('definition');
    const loadingIndicator = document.getElementById('loading');

    loadingIndicator.style.display = 'block';

    try {
        const response = await fetch(`/api/define/serendipity`);  // Example word of the day
        const data = await response.json();

        if (response.ok && data.length > 0) {
            const word = 'serendipity';
            const meanings = data[0].meanings.map(meaning => {
                return `
                    <div class="meaning">
                        <p><strong>${meaning.partOfSpeech}</strong>: ${meaning.definitions[0].definition}</p>
                    </div>
                `;
            }).join('');

            definitionDiv.innerHTML = `
                <h2>Word of the Day: "${word}"</h2>${meanings}
                <button id="speakButton" style="margin-top: 10px;">🔊 Speak</button>
            `;

            // Add event listener to the Speak button for the Word of the Day
            document.getElementById('speakButton').addEventListener('click', () => {
                speakWord(word);
            });
        } else {
            definitionDiv.innerHTML = '<p>No word of the day found.</p>';
        }
    } catch (error) {
        definitionDiv.innerHTML = '<p>An error occurred while fetching the word of the day.</p>';
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function speakWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    } else {
        alert('Sorry, your browser does not support speech synthesis.');
    }
}

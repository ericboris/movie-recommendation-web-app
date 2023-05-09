export async function submitMovieRating(accountAddress, movieId, rating) {
    const apiUrl = `http://127.0.0.1:5000/api/movies/${movieId}/rating`;

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accountAddress, rating }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting rating:', error);
        throw error;
    }
}

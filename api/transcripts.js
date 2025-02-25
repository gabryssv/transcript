import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, transcript } = req.body;

        // Ustal ścieżkę do folderu, w którym chcesz zapisać transkrypcje
        const transcriptsDir = path.join(process.cwd(), 'transcripts');

        // Upewnij się, że folder istnieje
        if (!fs.existsSync(transcriptsDir)) {
            fs.mkdirSync(transcriptsDir);
        }

        // Ustal nazwę pliku na podstawie userId i aktualnej daty
        const fileName = `transcript_${userId}_${Date.now()}.txt`;
        const filePath = path.join(transcriptsDir, fileName);

        // Zapisz transkrypcję do pliku
        fs.writeFile(filePath, transcript, (err) => {
            if (err) {
                console.error("Error writing transcript to file:", err);
                return res.status(500).json({ message: 'Error saving transcript' });
            }

            console.log(`Transcript saved to ${filePath}`);
            return res.status(200).json({ message: 'Transcript received and saved successfully' });
        });
    } else {
        // Obsłuż inne metody HTTP
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
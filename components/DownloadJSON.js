import { Button } from 'react-native-paper';
import { loadData } from '../utils/storage';

export default function MedList() {
  const downloadJSON = async () => {
    const data = await loadData('medications');
    if (!data) {
      alert('No data to export.');
      return;
    }

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'medications.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
      <Button icon="download" mode="contained" style={{ margin: 10 }} onPress={downloadJSON}>Download Medications</Button>
  );
}

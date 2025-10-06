import { useFilesData } from './hooks/useFilesData';
import { Alert } from './components/Alert';
import { FilesTable } from './components/FilesTable';

function App() {
  const { filesData, filesDataLoading, filesDataError } = useFilesData();

  return (
    <div className='container p-4'>
      {filesDataLoading && <Alert type='info'>Loading Files...</Alert>}
      {filesDataError && <Alert type='danger'>{filesDataError}</Alert>}
      {!filesDataLoading && !filesDataError && (
        <FilesTable filesData={filesData}></FilesTable>
      )}
    </div>
  )
}

export default App;

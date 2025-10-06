import React from "react";

export function FilesTable({ filesData }) {
  return (
    <>
      <div className="alert alert-primary" role="alert">React Test</div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">File</th>
            <th scope="col">Text</th>
            <th scope="col">Number</th>
            <th scope="col">Hex</th>
          </tr>
        </thead>
        <tbody>
          {filesData.map((file, fileIndex) => (
            <React.Fragment key={fileIndex}>
              {file.lines.map((line, lineIndex) => (
                <tr key={`${fileIndex}-${lineIndex}`}>
                  <td>{file.file}</td>
                  <td>{line.text}</td>
                  <td>{line.number}</td>
                  <td>{line.hex}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  )
}

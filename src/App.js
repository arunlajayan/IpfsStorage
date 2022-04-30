import React, { useCallback, useEffect, useState } from "react";

import { useDropzone } from 'react-dropzone'
import { Web3Storage } from "web3.storage";
import { StyledCard,UploadBtn,ModelCard,InsideCard,ProgressModel } from "./Style/StyleCompoent";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlCNmFkRTFEOENjMEYwMjNCQTVkMTBlNTY4MUFiMjRlOGRlQkIxMEMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTExMjQ3OTYzNzMsIm5hbWUiOiJwYXNzd29yZGFwcHRva2VuIn0.0qdpG7Zm6we70qB2gBli2FUVT9-Ti9gWd2IjtPSqde0";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [CID, setCid] = useState("");
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((accFiles, rejFiles) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });
  const onDelete = (file) => {
    console.log('deleet')
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  };

  const test = async (pass) => {
    const client = new Web3Storage({ token });
    var files = [];
    for (let j = 0; j < pass.length; j++) {
      let file = pass[j].file;
      files.push(file);
    }
    console.log(files);
    storeWithProgress(files, client);
  };


  async function storeWithProgress(files, client) {
    const onRootCidReady = (cid) => {
      console.log("uploading files with cid:", cid);
      setCid(cid);
    };


    
    const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
    let uploaded = 0;

    const onStoredChunk = (size) => {
      uploaded += size;
      console.log(totalSize, uploaded);
      const pct = (uploaded / totalSize) * 100;
      if (pct < 100) {
        setProgress(pct);
      } else {
        setProgress(100.0);
      }
      console.log(`Uploading... ${pct.toFixed(1)}% complete`);
    };
    setShowModal(true);
    return client.put(files, { onRootCidReady, onStoredChunk });
  }


  return (
    <StyledCard>
<div
        {...getRootProps()}
        style={{
          height: "100%",
          width: "100%",
          // backgroundColor: "rgb(235,235,235)",
          boxShadow: "0px 0px 50px lightgray",
          borderRadius: "15px",
          justifyContent: files.length > 0 ? "space-evenly" : "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
             <input {...getInputProps()} disabled={showModal} />
             {files.length > 0 ? (
        <p   style={{
              marginBottom: "40px",
              fontWeight: "600",
              marginTop: "20px"}}>  Click background to add more files</p>
             ) : (
              <p style={{ fontWeight: "600" }}>
              Drag some files here, or click to upload
            </p>
             )}
           
            {showModal ? <Modal progress={progress} cid={CID} /> : null}
      </div>
      {files.map((fileWrapper, i) => (
          <FileHeader key={i} file={fileWrapper.file} onCL={onDelete} />
        ))}
      {files.length > 0 ? (
         <UploadBtn  
            onClick={() => test(files)}>Upload 📡</UploadBtn>
            ) : null}
    </StyledCard>

  );
}
const FileHeader = ({ file, onDelete }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "calc(100% - 80px)",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <p style={{ fontWeight: "500" }}>{file.name.substring(0, 30)}</p>
      <button onclick={() => onDelete(file)}>
        <p>🗑</p>
      </button>
    </div>
  );
}
const Modal = (progress, cid) => {
  useEffect(() => {
    console.log("&", progress.progress);
  }, [progress]);
  useEffect(() => {
    console.log(progress.cid);
  }, [cid]);
  return (
    <ModelCard
    >
      <InsideCard
      >
        {progress.progress == 100 ? (
          <ProgressModel
          >
            <p style={{ marginBottom: "20px", fontWeight: "600" }}>
              That your link !
            </p>
            <p style={{ marginBottom: "10px" }}>
              Share it with whoever you want.
            </p>
            <p>https://{(progress.cid)}.ipfs.dweb.link</p>
          </ProgressModel>
        ) : (
          <div>
            <p style={{ marginBottom: "20px" }}>
              Your files are uploading...
            </p>
            {/* <p>{String(progress.progress).substring(0, 4)}%</p> */}
            {/* <ActivityIndicator color={"lightgray"} size={"large"} /> */}
          </div>
        )}
      </InsideCard>
    </ModelCard>
  );
};

export default App;

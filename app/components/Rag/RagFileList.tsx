import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import ProcessIcon from '@mui/icons-material/Assignment';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import FilePaper from '../FileList';

interface RagFileListProps {
  files: { name: string; id: string; ragId: string }[];
  onDelete: (file: RagFile) => void;
  onProcess: (file: RagFile) => void;
}

const RagFileList: React.FC<RagFileListProps> = ({
  files,
  onDelete,
  onProcess,
}) => {
  return (
    <div style={{ paddingTop: 5 }}>
      <FilePaper
        files={files}
        renderFileItem={(file) => (
          <ListItem key={file.id}>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={file.name} />
            <div>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(file)}
              >
                <Tooltip title='Delete'>
                  <DeleteIcon />
                </Tooltip>
              </IconButton>
                <IconButton
                  edge="end"
                  aria-label="process"
                  onClick={() => onProcess(file)}
                  disabled={file.processed}
                >
                  {file.processed ? <DownloadDoneIcon /> : <Tooltip title='Process file(s)'><ProcessIcon /></Tooltip>}
                </IconButton>
            </div>
          </ListItem>
        )}
      />
    </div>
  );
};

export default RagFileList;

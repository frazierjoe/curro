import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const ImagePicker = props => {
  
  const useStyles = makeStyles((theme) => ({
    imagePicker: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 16,
      borderWidth: 2,
      borderRadius: 2,
      borderColor: theme.palette.secondary.main,
      borderStyle: 'dashed',
      backgroundColor: theme.palette.background.main,
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border 0.24s ease-in-out',
    },
    thumbStyle: {
      display: 'inline-flex',
      borderRadius: props.rounded ? 32 : 2,
      border: '1px solid #eaeaea',
      marginBottom: 8,
      marginRight: 8,
      width: 64,
      height: 64,
      padding: 4,
    },
    thumbInner: {
      display: 'flex',
      minWidth: 0,
      overflow: 'hidden',
    },
    avatarPreview: {
      display: 'block',
      width: 'auto',
      height: '100%',
      borderRadius: props.rounded ? 32 : 0
    },
    
  }));

  const [preview, setPreview] = useState(props.preview);

  const [errors, setErrors] = useState();

  // Followed this guide for uploading profile images
  // https://www.thomasmaximini.com/upload-images-to-aws-s3-with-react-and-apollo-graphql
  const onDrop = useCallback(
    async ([file]) => {
      if (file) {
        setPreview(URL.createObjectURL(file));
        setErrors('')
        props.setFileToUpload(file);
      } else {
        setErrors(
          'Something went wrong. Check file type (jpeg, png) and size (max. 1 MB)',
        );
      }
    },
    [],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxSize: 1024000,
  });

  const classes = useStyles();

  const thumb = (
    <div className={classes.thumbStyle}>
      <div className={classes.thumbInner}>
        <img src={preview} alt="avatar" className={classes.avatarPreview}/>
      </div>
    </div>
  );

  return (
    <Box className={classes.imagePicker}
      {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant="body2" color="textSecondary">Drop the files here ...</Typography>
      ) : (
        <Typography variant="body2" color="textSecondary">Drop file here, or click to select file</Typography>
      )}
      {preview && <aside >{thumb}</aside>}
      {errors && <Typography variant="body2" color="error">{errors}</Typography>}
    </Box>);
}
import { useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { useCreateStreamer } from '../../../services/networking/streamers/useCreateStreamer';
import { apiRoutes } from '../../../services/networking/apiRoutes';
import { toast } from 'react-toastify';
import {
  streamerFormInitialValues,
  streamerFormValidationSchema,
} from '../../../constants/validation/streamer-form.schema';
import { StreamingPlatform } from '../../../services/networking/streamers/types';
import { useState } from 'react';
import { useAddStreamerPhoto } from '../../../services/networking/streamers/useAddStreamerPhoto';
import {
  avatarName,
  createStreamerBtn,
  streamerFormInput,
  uploadAvatarButton,
} from './styles';

interface StreamerFormProps {
  onCreateSuccess?: () => void;
}

function StreamerForm({ onCreateSuccess }: StreamerFormProps) {
  const [selectedFile, setSelectedFile] = useState<File>();
  const queryClient = useQueryClient();

  const { mutate: createStreamer, isLoading: isCreatingStreamer } =
    useCreateStreamer({
      onSuccess: (data) => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
          addStreamerPhoto({ streamerId: data._id, formData });
          return;
        }
        onCreateSuccess?.();
        queryClient.invalidateQueries([apiRoutes.streamers]);
        toast.success('New streamer created');
      },
      onError: (err) => {
        console.log(err);
        toast.error(err.response.data.message);
      },
    });

  const { mutate: addStreamerPhoto, isLoading: isAddingPhoto } =
    useAddStreamerPhoto({
      onSuccess: () => {
        onCreateSuccess?.();
        queryClient.invalidateQueries([apiRoutes.streamers]);
        toast.success('New streamer created');
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    });

  const streamerForm = useFormik({
    initialValues: streamerFormInitialValues,
    validationSchema: streamerFormValidationSchema,
    onSubmit: (values) => {
      createStreamer(values);
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <Stack
      spacing={2}
      alignItems="center"
      component="form"
      onSubmit={streamerForm.handleSubmit}
    >
      <TextField
        label="Name"
        name="name"
        value={streamerForm.values.name}
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={streamerForm.handleChange}
        sx={streamerFormInput}
        error={!!streamerForm.errors.name}
      />
      <TextField
        label="Platform"
        value={streamerForm.values.platform}
        onChange={streamerForm.handleChange}
        name="platform"
        select
        sx={{ ...streamerFormInput, width: '100%' }}
        error={!!streamerForm.errors.platform}
      >
        {Object.values(StreamingPlatform).map((platform) => (
          <MenuItem key={platform} value={platform}>
            {platform}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        name="description"
        onChange={streamerForm.handleChange}
        value={streamerForm.values.description}
        multiline
        sx={streamerFormInput}
        error={!!streamerForm.errors.description}
      />
      <Box display="flex" width="100%" gap={1} paddingTop={2}>
        <Stack display="flex" gap={1} alignItems="center" flex={1}>
          <Button variant="outlined" component="label" sx={uploadAvatarButton}>
            <Typography sx={avatarName}>
              {selectedFile ? selectedFile.name : 'UPLOAD AVATAR'}
            </Typography>
            <input
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </Stack>
        <LoadingButton
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={createStreamerBtn}
          loading={isCreatingStreamer || isAddingPhoto}
        >
          Create
        </LoadingButton>
      </Box>
    </Stack>
  );
}

export default StreamerForm;

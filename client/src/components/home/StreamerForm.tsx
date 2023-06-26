import { useQueryClient } from '@tanstack/react-query';
import { MenuItem, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { useCreateStreamer } from '../../services/networking/streamers/useCreateStreamer';
import { apiRoutes } from '../../services/networking/apiRoutes';
import { toast } from 'react-toastify';
import {
  streamerFormInitialValues,
  streamerFormValidationSchema,
} from '../../constants/validation/streamer-form.schema';
import { StreamingPlatform } from '../../services/networking/streamers/types';

interface StreamerFormProps {
  onCreateSuccess?: () => void;
}

function StreamerForm({ onCreateSuccess }: StreamerFormProps) {
  const queryClient = useQueryClient();

  const { mutate: createStreamer, isLoading: isCreatingStreamer } =
    useCreateStreamer({
      onSuccess: () => {
        onCreateSuccess?.();
        queryClient.invalidateQueries([apiRoutes.streamers]);
        toast.success('Stworzono nowego streamera');
      },
      onError: (err) => {
        console.log(err);
        toast.error('Wystąpił błąd podczas dodawania streamera');
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

  return (
    <form onSubmit={streamerForm.handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={streamerForm.values.name}
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={streamerForm.handleChange}
        error={!!streamerForm.errors.name}
      />
      <TextField
        sx={{ width: '100%' }}
        label="Platform"
        value={streamerForm.values.platform}
        onChange={streamerForm.handleChange}
        name="platform"
        select
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
        error={!!streamerForm.errors.description}
      />
      <LoadingButton
        variant="contained"
        color="primary"
        fullWidth
        type="submit"
        loading={isCreatingStreamer}
        sx={{ mt: 2 }}
      >
        Create
      </LoadingButton>
    </form>
  );
}

export default StreamerForm;

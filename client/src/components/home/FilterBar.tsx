import { Box, MenuItem, Stack, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StreamingPlatform } from '../../services/networking/streamers/types';

const limitOptions = [10, 20, 44, 50, 77, 100];

export type IQueryParams = {
  page?: number;
  limit?: number;
  streamer?: string;
  platforms?: string[];
};

interface FilterBarProps {
  setQueryParams: Dispatch<SetStateAction<IQueryParams>>;
}

function FilterBar({ setQueryParams }: FilterBarProps) {
  const [searchedStreamer, setSearchedStreamer] = useState('');
  const [chosenPlatforms, setChosenPlatforms] = useState<StreamingPlatform[]>(
    [],
  );
  const [limit, setLimit] = useState(limitOptions[0]);

  useEffect(() => {
    setQueryParams((prev) => {
      return {
        ...prev,
        streamer: searchedStreamer,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedStreamer]);

  useEffect(() => {
    setQueryParams((prev) => {
      return {
        ...prev,
        platforms: chosenPlatforms,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenPlatforms]);

  useEffect(() => {
    setQueryParams((prev) => {
      return {
        ...prev,
        limit: limit,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return (
    <Stack display="flex" width="100%" spacing={2} alignItems="center">
      <Box display="flex" alignItems="center">
        <TextField
          label="Streamer's name"
          value={searchedStreamer}
          multiline
          size="small"
          onChange={(e) => setSearchedStreamer(e.target.value)}
        />
        <TextField
          label="Platforms"
          value={chosenPlatforms}
          size="small"
          onChange={(e) =>
            setChosenPlatforms(e.target.value as unknown as StreamingPlatform[])
          }
          select
          SelectProps={{
            multiple: true,
            renderValue: (selected) =>
              (selected as StreamingPlatform[]).join(', '),
          }}
        >
          {Object.values(StreamingPlatform).map((platform) => (
            <MenuItem key={platform} value={platform}>
              {platform}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <TextField
        value={limit}
        label="Quantity"
        onChange={(e) => setLimit(parseInt(e.target.value))}
        select
      >
        {limitOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}

export default FilterBar;

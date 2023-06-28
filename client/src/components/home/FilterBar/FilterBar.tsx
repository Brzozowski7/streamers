import { Container, MenuItem, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StreamingPlatform } from '../../../services/networking/streamers/types';
import { filterBarInput, filterBarWrapper } from './styles';
import { limitOptions } from './FilterBar.const';



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
        page: 1,
        streamer: searchedStreamer,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedStreamer]);

  useEffect(() => {
    setQueryParams((prev) => {
      return {
        ...prev,
        page: 1,
        platforms: chosenPlatforms,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenPlatforms]);

  useEffect(() => {
    setQueryParams((prev) => {
      return {
        ...prev,
        page: 1,
        limit: limit,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return (
    <Container sx={filterBarWrapper}>
      <TextField
        sx={{ ...filterBarInput, width: 150 }}
        label="Streamer's name"
        value={searchedStreamer}
        size="small"
        onChange={(e) => setSearchedStreamer(e.target.value)}
      />
      <TextField
        sx={{ ...filterBarInput, width: 150 }}
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
      <TextField
        value={limit}
        sx={{ ...filterBarInput, width: 75 }}
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
    </Container>
  );
}

export default FilterBar;

import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { useState, useEffect } from 'react';
import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';

import { BACKGROUND_FETCH_TASK, registerBackgroundFetchAsync, unregisterBackgroundFetchAsync } from '../services/scheduler';

export default function BackgroundFetchScreen() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState<BackgroundFetch.BackgroundFetchStatus | null>(null);

  useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };

  return (
    <Box justifyContent="center">
      <Box>
        <Text>
          Background fetch status: <Text bold>{status && BackgroundFetch.BackgroundFetchStatus[status]}</Text>
        </Text>
        <Text>
          Background fetch task name: <Text bold>{isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}</Text>
        </Text>
      </Box>
      <Button>
        <ButtonText onPress={toggleFetchTask}>{isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}</ButtonText>
      </Button>
    </Box>
  );
}

import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';

import EditScreenInfo from '../../components/EditScreenInfo';
import BackgroundFetchScreen from '../../components/BacckgroundFetchScreen';

export default function TabOneScreen() {
  return (
    <Box justifyContent="center">
      <BackgroundFetchScreen />
      <Text>Tab Oneあ</Text>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Button>
        <ButtonText>Button</ButtonText>
      </Button>
    </Box>
  );
}

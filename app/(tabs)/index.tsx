import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';

import EditScreenInfo from '../../components/EditScreenInfo';
import BackgroundFetchScreen from '../../components/BacckgroundFetchScreen';
import { Bitbank } from '../../services/bitbank';

export default function TabOneScreen() {
  const handlePressBitbank = async () => {
    // TODO: THIS IS DANGEROUS CODE. DO NOT DO THIS IN PRODUCTION.
    const apiKey = process.env.EXPO_PUBLIC_BITBANK_API_KEY ?? '';
    const apiSecret = process.env.EXPO_PUBLIC_BITBANK_API_SECRET ?? '';
    const bitbank = new Bitbank(apiKey, apiSecret);

    const assets = await bitbank.getAssets().catch((e) => {
      console.log(e);

      throw e;
    });

    console.log(`assets: ${JSON.stringify(assets)}`);
  };

  return (
    <Box justifyContent="center">
      <BackgroundFetchScreen />
      <Text>Tab Oneあ</Text>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Button>
        <ButtonText>Button</ButtonText>
      </Button>

      <Button onPress={handlePressBitbank}>
        <ButtonText>Bitbank</ButtonText>
      </Button>
    </Box>
  );
}

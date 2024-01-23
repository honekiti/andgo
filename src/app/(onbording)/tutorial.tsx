import { useState } from 'react';
import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

/**
 * チュートリアル画面
 */
export default function TutorialScreen() {
  const [active, setActive] = useState(false);

  return (
    <Box>
      <Text>カルーセル</Text>
      <Link disabled={!active} href="/config" asChild>
        <Button disabled={!active}>
          <ButtonText>始める</ButtonText>
        </Button>
      </Link>
    </Box>
  );
}

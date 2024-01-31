import { useState } from 'react';
import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

/**
 * 利用規約同意画面
 */
export default function TermsOfServiceScreen() {
  const [active, setActive] = useState(false);

  return (
    <Box>
      <Text>利用規約</Text>
      <Text>aaa</Text>
      <Link disabled={!active} href="/config" asChild>
        <Button disabled={!active}>
          <ButtonText>同意する</ButtonText>
        </Button>
      </Link>
    </Box>
  );
}

import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

export default function ConfigScreen() {
  return (
    <Box>
      <Text>設定</Text>
      <Link href="/config/exchange">
        <Button>
          <ButtonText>取引所</ButtonText>
        </Button>
      </Link>
    </Box>
  );
}

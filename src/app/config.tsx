import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { ExternalLink } from '../components/ExternalLink';

export default function ConfigScreen() {
  return (
    <Box>
      <Text>設定</Text>
      <Link href="/exchange-list" asChild>
        <Button>
          <ButtonText>取引所</ButtonText>
        </Button>
      </Link>

      <Link href="/terms-of-service" asChild>
        <Button borderRadius="$full">
          <ButtonText>利用規約</ButtonText>
        </Button>
      </Link>

      <ExternalLink href="/" asChild>
        <Button borderRadius="$full">
          <ButtonText>最新リリース情報</ButtonText>
        </Button>
      </ExternalLink>
    </Box>
  );
}

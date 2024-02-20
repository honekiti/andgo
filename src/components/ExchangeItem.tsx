import { useState } from 'react';
import {
  Button,
  HStack,
  VStack,
  Text,
  Icon,
  ButtonText,
  CloseCircleIcon,
  useToast,
  Toast,
  ToastTitle,
  ModalBackdrop,
  ModalContent,
  Heading,
  ModalHeader,
  ModalCloseButton,
  CloseIcon,
  ModalFooter,
  Modal,
} from '@gluestack-ui/themed';
import { useAtomValue } from 'jotai';
import { ExchangeMaster } from '../models';
import { white, red, unclearWhite } from '../constants/Colors';
import { store } from '../store';
import { exchangeCredentialsAtom, exchangeBalanceFamily } from '../services/exchange-service';
export type ExchangeItemProps = { exchange: ExchangeMaster };
export default function ExchangeItem(props: { exchange: ExchangeMaster }) {
  const toast = useToast();
  const [showPrompt, setShowPrompt] = useState(false);
  const balanceInfo = useAtomValue(exchangeBalanceFamily(props.exchange.id));

  const handlePressUnregister = async () => {
    const credentials = await store.get(exchangeCredentialsAtom);
    const newCredentials = credentials.filter((c) => c.exchangeId !== props.exchange.id);

    await store.set(exchangeCredentialsAtom, newCredentials);

    setShowPrompt(false);

    toast.show({
      render: () => (
        <Toast action="success">
          <ToastTitle>連携を解除しました</ToastTitle>
        </Toast>
      ),
    });
  };

  return (
    <HStack justifyContent="space-between" alignItems="center" p="$4" borderBottomWidth={0.3} borderBottomColor={unclearWhite}>
      <VStack space="md" py="$1">
        <Text color={white} fontSize={23} bold>
          {props.exchange.name}
        </Text>
        <HStack space="xs">
          <Text color={white} fontSize={12}>
            残高
          </Text>
          <Text color={white} fontSize={18}>
            {balanceInfo.data?.JPY !== undefined ? balanceInfo.data.JPY.toLocaleString() : '---'}
          </Text>
          <Text color={white} fontSize={12}>
            円
          </Text>
          {balanceInfo.isError && (
            <Text ml="$2" color={red}>
              参照エラー
            </Text>
          )}
        </HStack>
      </VStack>

      <Button h="$12" w="$10" onPress={() => setShowPrompt(true)} justifyContent="center" alignItems="center" bg="#0000">
        <Icon as={CloseCircleIcon} color={red} size="xl" />
      </Button>

      <Modal
        isOpen={showPrompt}
        onClose={() => {
          setShowPrompt(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">連携を解除します</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowPrompt(false);
              }}
            >
              <ButtonText>キャンセル</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                handlePressUnregister();
              }}
            >
              <ButtonText>OK</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
}

import { HStack, Box, Pressable } from '@gluestack-ui/themed';

type CarouselIndicatorProps = {
  pages: number;
  activePage: number;
  onChangePage: (page: number) => void;
};

export default function CarouselIndicator(props: CarouselIndicatorProps) {
  return (
    <HStack h="$10" alignItems="center" justifyContent="center" bgColor="#0000">
      {Array.from({ length: props.pages })
        .map((_, index) => index)
        .map((index) => (
          <Pressable key={index} onPress={() => props.onChangePage(index)}>
            <Box
              width="$3"
              height="$3"
              borderRadius="$full"
              marginHorizontal="$1"
              borderWidth={1}
              borderColor="white"
              bgColor={index === props.activePage ? 'white' : '#0000'}
            />
          </Pressable>
        ))}
    </HStack>
  );
}

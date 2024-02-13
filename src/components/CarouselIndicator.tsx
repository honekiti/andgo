import { HStack, Box, Pressable } from '@gluestack-ui/themed';

type CarouselIndicatorProps = {
  pages: number;
  activePage: number;
  onChangePage: (page: number) => void;
};

export default function CarouselIndicator(props: CarouselIndicatorProps) {
  return (
    <HStack h="$10" alignItems="center" justifyContent="center" bgColor="grey">
      {Array.from({ length: props.pages })
        .map((_, index) => index)
        .map((index) => (
          <Pressable key={index} onPress={() => props.onChangePage(index)}>
            <Box width="$4" height="$4" borderRadius="$full" marginHorizontal="$1" backgroundColor={index === props.activePage ? 'white' : 'red'} />
          </Pressable>
        ))}
    </HStack>
  );
}

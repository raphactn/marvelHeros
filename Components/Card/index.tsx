import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface CardProps {
  characters: any;
  setCharacter: (character: any) => void;
}

export const Card = ({ characters, setCharacter }: CardProps) => {
  return characters?.map((character: any) => (
    <Box maxW="300px">
      <Image
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        w="100%"
        rounded={"md"}
        boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
        borderBottom={"10px solid"}
        borderColor="#ff0000"
        onClick={() => setCharacter(character)}
      />
      <Flex mt={2} justifyContent={"space-between"} ml={1} mr={1}>
        <Text>{character.name}</Text>
      </Flex>
    </Box>
  ));
};

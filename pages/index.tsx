import {
  Box,
  Center,
  Image,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  SimpleGrid,
  Flex,
  Select,
  IconButton,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import { GetServerSideProps } from "next";
import { SetStateAction, useEffect, useState } from "react";
import api from "./api/marvel";
import { Card } from "../Components/Card";
import Router from "next/router";
import { CharacterDrawer } from "../Components/Drawer";
import Head from "next/head";

export default function Home({ data }: any) {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState<number | string>(20);
  const [character, setCharacter] = useState<any>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (search.length > 0) {
      Router.push({
        query: {
          limit: limit,
          offset: offset,
          nameStartsWith: search,
        },
      });
    } else {
      Router.push({
        query: {
          limit: limit,
          offset: offset,
        },
      });
    }
  }, [limit, offset, search]);

  const handleNextPage = () => {
    setPage(page + 1);
    setOffset(page * data.count);
  };

  const handleBackPage = () => {
    setPage(page - 1);
    setOffset(offset - data.count);
  };

  const handleChangeLimit = (value: string) => {
    setLimit(value);
    setOffset(0);
    setPage(1);
  };

  const handleOpenCharacter = (character: SetStateAction<never[]>) => {
    setCharacter(character);
    setOpen(!open);
  };

  return (
    <>
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Marvel - Search Heros</title>
      </Head>
      <Center p={3} bg={"blackAlpha.900"}>
        <span
          className="icon--svg icon--svg mvl-animated-logo"
          aria-hidden="true"
        >
          <svg width="130" height="52" xmlns="http://www.w3.org/2000/svg">
            <rect fill="#EC1D24" width="100%" height="100%"></rect>
            <path
              fill="#FEFEFE"
              d="M126.222 40.059v7.906H111.58V4h7.885v36.059h6.757zm-62.564-14.5c-.61.294-1.248.44-1.87.442v-14.14h.04c.622-.005 5.264.184 5.264 6.993 0 3.559-1.58 5.804-3.434 6.705zM40.55 34.24l2.183-18.799 2.265 18.799H40.55zm69.655-22.215V4.007H87.879l-3.675 26.779-3.63-26.78h-8.052l.901 7.15c-.928-1.832-4.224-7.15-11.48-7.15-.047-.002-8.06 0-8.06 0l-.031 39.032-5.868-39.031-10.545-.005-6.072 40.44.002-40.435H21.278L17.64 26.724 14.096 4.006H4v43.966h7.95V26.78l3.618 21.192h4.226l3.565-21.192v21.192h15.327l.928-6.762h6.17l.927 6.762 15.047.008h.01v-.008h.02V33.702l1.845-.27 3.817 14.55h7.784l-.002-.01h.022l-5.011-17.048c2.538-1.88 5.406-6.644 4.643-11.203v-.002C74.894 19.777 79.615 48 79.615 48l9.256-.027 6.327-39.85v39.85h15.007v-7.908h-7.124v-10.08h7.124v-8.03h-7.124v-9.931h7.124z"
            ></path>
            <path fill="#EC1D24" d="M0 0h30v52H0z"></path>
            <path
              fill="#FEFEFE"
              d="M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z"
            ></path>
          </svg>
        </span>
      </Center>
      <Box p={10}>
        <CharacterDrawer open={open} setOpen={setOpen} character={character} />
        <Center flexDirection={"column"}>
          <Text fontSize={"2xl"} fontWeight="bold">
            EXPLORE O UNIVERSO
          </Text>
          <Text textAlign={"center"} mt={2}>
            Mergulhe no dominio deslumbrante de todos os personagens clássicos
            que você ama - e aqueles que você descobrirá em breve!
          </Text>
          <InputGroup maxW={"lg"} mt={5}>
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="red.500" />}
            />
            <Input
              onChange={(e) => setSearch(e.target.value)}
              focusBorderColor="red.500"
              variant="flushed"
              placeholder="Procure por Heróis"
            />
          </InputGroup>
        </Center>
        <Flex mt={10} justifyContent="space-between" ml={5} mr={10}>
          <Box>
            <Text>Encontrados {data.count} Heróis</Text>
          </Box>
          <Box>
            <Center color="red.500" gap={2}>
              <Image src="ic_heroi.svg" />
              <Text>Ordenar por nome A/Z</Text>
              <Image cursor="pointer" src="toggle_off.svg" w="50px" />
            </Center>
          </Box>
        </Flex>
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
          spacing={5}
          mt={5}
        >
          <Card
            characters={data.results}
            setCharacter={(e) => handleOpenCharacter(e)}
          />
        </SimpleGrid>
        <Flex mt={10} gap={5} float={"right"} mb={5}>
          <Center gap={5}>
            <Text whiteSpace={"nowrap"}>Linhas por Pagina: </Text>
            <Select
              focusBorderColor="red.500"
              value={data.limit}
              variant="flushed"
              onChange={(e) => handleChangeLimit(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </Select>
          </Center>
          <Center>
            <Text>{`${page}-${data.count} de ${data.total}`}</Text>
          </Center>
          <Center gap={2}>
            <IconButton
              disabled={page === 1 ? true : false}
              onClick={handleBackPage}
              icon={<ChevronLeftIcon fontSize={"2xl"} />}
              aria-label={""}
            />
            <IconButton
              onClick={handleNextPage}
              icon={<ChevronRightIcon fontSize={"2xl"} />}
              aria-label={""}
            />
          </Center>
        </Flex>
      </Box>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const limit = context.query.limit;
  const offset = context.query.offset;
  const nameStartsWith = context.query.nameStartsWith;
  const { data } = await api.get(`/characters`, {
    params: {
      limit,
      offset,
      nameStartsWith,
    },
  });

  return {
    props: {
      data: data.data,
    },
  };
};

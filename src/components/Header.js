import React, { useEffect, useState } from "react";
import eventBus from "../EventBus";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Button, Text, HStack, Flex, Image, Spacer } from "@chakra-ui/react";
import { easyTruncateAddress } from "../utils";
import { userSession } from "../hiroWalletUserSession";

export default function Header(props) {
  const address = props.address;
  const isConnected = props.isConnected;
  const walletType = props.walletType;

  const disconnect = () => {
    if (walletType === "hiro") {
      userSession.signUserOut("/");
    }
    eventBus.dispatch("set-address", { address: "" });
    eventBus.dispatch("is-account-connected", { isConnected: false });
  };

  const openSelectWalletModal = () => {
    eventBus.dispatch("is-select-wallet-modal-open", {
      isSelectWalletOpen: true,
    });
  };

  return (
    <>
      <HStack
        height="auto"
        width="auto"
        spacing={[5, 55]}
        marginTop={[5, 25]}
        marginBottom={[5, 25]}
        marginLeft={5}
        marginRight={25}
      >
        <Button
          as="a"
          href="https://www.dlc.link/"
          _hover={{
            background: "none",
          }}
          variant="ghost"
          height={[25, 65]}
          width={100}
        >
          <Image
            src="/dlc.link_logo.png"
            alt="DLC.Link Logo"
            height={[25, 65]}
            width={[25, 65]}
          />
        </Button>
        <Spacer></Spacer>
        {!isConnected ? (
          <HStack>
            <Button
              _hover={{
                background: "secondary1",
              }}
              shadow="dark-lg"
              height={[25, 50]}
              width={[125, 250]}
              bgGradient="linear(to-r, primary1, primary2)"
              onClick={openSelectWalletModal}
            >
              <Text color="white" fontSize={[10, 15]}>
                Connect Wallet
              </Text>
            </Button>
          </HStack>
        ) : (
          <Button
            _hover={{
              background: "accent",
            }}
            shadow="dark-lg"
            height={[25, 50]}
            width={[125, 250]}
            bgGradient="linear(to-r, primary1, primary2)"
            onClick={disconnect}
          >
            <Text color="white" fontSize={[10, 15]}>
              Disconnect
            </Text>
          </Button>
        )}
        <Flex
          bgGradient="linear(to-d, secondary1, secondary2)"
          borderRadius="lg"
          justifyContent="center"
          height={[25, 50]}
          width={[100, 200]}
          padding="10px 10px"
          shadow="dark-lg"
        >
          {isConnected ? (
            <HStack>
              {walletType === "metamask" ? (
                <Image
                  src="/mm_logo.png"
                  alt="Metamask Logo"
                  boxSize={[2, 6]}
                />
              ) : (
                <Image
                  src="/h_logo.png"
                  alt="Hiro Wallet Logo"
                  boxSize={[2, 6]}
                />
              )}
              <CheckCircleIcon boxSize={[1, 3]} color="secondary1" />
              <Text color="white" fontSize={[5, 10]}>
                Account:{easyTruncateAddress(address)}
              </Text>
            </HStack>
          ) : (
            <HStack>
              <WarningIcon boxSize={[1, 3]} color="primary2" />
              <Text
                padding={3}
                color="white"
                fontSize={[4, 10]}
                width={[50, 100]}
              >
                Account: Not connected
              </Text>
            </HStack>
          )}
        </Flex>
      </HStack>
    </>
  );
}

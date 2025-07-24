import React from 'react';
import '@mantine/core/styles.css';
import { MantineProvider, AppShell, Modal, Button, Textarea, AppShellSection, AppShellAside, SimpleGrid, Burger } from '@mantine/core'
import { Group, Text, Collapse, Box, Skeleton, ScrollArea, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Container } from '@mantine/core';

import { ChatControls } from './chat-controls'
import { ChatContacts } from './chat-contacts'
import { ChatDiscussions } from './chat-discussions'
import { ChatInput } from './chat-input'
import { ChatMessages } from './chat-messages'

import { theme } from '../theme'
import { useState } from 'react';
import '@mantine/core/styles.css'
import { DISCUSSION_id } from '../constants/constants';

export function ChatApp() {
  
  const [modalIsVisible, { open: openModal, close: closeModal }] = useDisclosure(false)
  const [opened, { toggle }] = useDisclosure(false);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  
  const [selectedDiscussion, selectDiscussion] = useState(DISCUSSION_id);
  const [openedModal, { open, close }] = useDisclosure(false);

  return (
    <MantineProvider theme={theme}>
      <AppShell
         aside = {{  width : 400,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
          header = {{height : 40}}        
          navbar = {{width: 350,
            breakpoint: 'sm',
            collapsed: { mobile: mobileOpened, desktop: desktopOpened },}}
          padx = "0">
          
        <AppShell.Header >
        <Group h="100%" px="md">

        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />

        </Group>
        </AppShell.Header>
        
        <AppShell.Navbar>
        <Modal opened={openedModal} onClose={close} title="CONTACT LIST">
            <ChatContacts />
          </Modal>
            <div class="flex justify-center">
              <Button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-[20px] px-[100px] m-4 rounded-lg"
                      onClick={open} visibleFrom="sm" size="sm" >New Chat</Button>
            </div>
            <ChatDiscussions selectDiscussion={selectDiscussion} selectedDiscussion={selectedDiscussion} />
        </AppShell.Navbar>
        
        <AppShell.Aside>
          <div>Contact list</div>    
        </AppShell.Aside>

        <AppShell.Main > 
           <Container fluid h={655} bg="var(--mantine-color-gray-light)">
              <ChatMessages selectedDiscussion={selectedDiscussion} />
           </Container> 
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}


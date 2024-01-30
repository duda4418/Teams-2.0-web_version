import { MultiSelect } from '@mantine/core';
import { Badge, Button, Table } from '@mantine/core'
import { useEffect, useState } from 'react'
import { ChatDiscussionList } from './chat-discussion_list'
import { USER_id } from '../constants/constants'

const MY_ID = USER_id
const API = 'http://localhost:8000/api'
const CONTACTS_ENDPOINT = `${API}/contacts`
const DISCUSSIONS_ENDPOINT = `${API}/discussions`

async function fetchContacts() {
  const response = await window.fetch(CONTACTS_ENDPOINT)
  const data = await response.json()

  return data
}

async function postDiscussion(value, id_list) {

  const body = {
    contacts: [...id_list, MY_ID],
    name: value
  }

  const response = await window.fetch(DISCUSSIONS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  return data
}

export function ChatContacts() {
  const [contacts, setContacts] = useState([])
  const [selectedContacts, selectContacts] = useState([])
  const [selectedContactNames, selectContactNames] = useState([])
  const [value, setValue] = useState('')

  async function loadContacts() {
    const data = await fetchContacts()
    const newContacts = {}
    data.filter(contact => contact.id != MY_ID).map((contact) => newContacts.value = contact.id, newContacts.label = contact.name)
    console.log(newContacts)
    setContacts(newContacts)
  }

  useEffect(() => {
    loadContacts()
  }, [])

  function updateSelectedContacts(id, name) {
    const idPosition = selectedContacts.indexOf(id); 
    let newSelectedContacts = []
    let newSelectedContactNames = []
    if (idPosition === -1) {
        newSelectedContacts = [...selectedContacts, id];
        newSelectedContactNames = [...selectedContactNames, name]
    }
    else {
        newSelectedContacts = selectedContacts.slice(0, idPosition).concat(selectedContacts.slice(idPosition + 1));
        newSelectedContactNames = selectedContactNames.slice(0, idPosition).concat(selectedContactNames.slice(idPosition + 1));
    }
    selectContacts(newSelectedContacts)
    selectContactNames(newSelectedContactNames)
  }

  return (
       <>
    <textarea
        className="h-15 w-full border-2"
        placeholder="  Type message.."
        onChange={(event) => setValue(event.target.value)}
      />
    {/*newSelectedContacts = [...selectedContacts, value];*/}
    <Button variant="outline" color="blue" size="md" className=" max-w-299"onClick={() => postDiscussion(value, selectedContacts)}>
                Conv with: {selectedContactNames.join(', ')}
     </Button>
     <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={contacts}
      searchable
      clearable
    />
            <Table verticalSpacing="md">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={400}>Name</Table.Th>
                        <Table.Th>Actions</Table.Th>
                        <Table.Th />
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {contacts.map((contact) =>(
                        <Table.Tr key={contact.id}>
                        <Table.Td> {contact.name}</Table.Td>
                        <Table.Td>
                            <Button onClick={() => updateSelectedContacts(contact.id, contact.name)}
                            variant={selectedContacts.indexOf(contact.id) === -1 ? "outline" : "default"}
                            color="blue">
                                Select
                            </Button>
                        </Table.Td>
                    </Table.Tr>
                ))}
                </Table.Tbody>
            </Table>
    </>
  )
}
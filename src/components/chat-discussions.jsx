import { Badge, Button, ScrollArea, Table } from '@mantine/core'
import { useEffect, useState } from 'react'
// import { ChatDiscussionList } from './chat-discussion_list'
import { USER_id } from '../constants/constants'
import React from 'react';

const API = 'http://localhost:8000/api'
const MY_ID = USER_id
const DISCUSSIONS_ENDPOINT = '/discussions/?user_id='

async function fetchDiscussions() {
  const response = await window.fetch(`${API}${DISCUSSIONS_ENDPOINT}${MY_ID}`)
  const data = await response.json()

  return data
}
export function ChatDiscussions({selectDiscussion, selectedDiscussion}) {

  const [discussions, setDiscussions] = useState([])

  async function loadDiscussions() {
    const data = await fetchDiscussions()
    setDiscussions(data)
  }
  useEffect(() => {
    loadDiscussions()
  }, [])
  return(
    <>
    <ScrollArea>
      {discussions.map((discussion) => (
        <div>

          <Button className="bg-orange-200 h-12 m-1" fullWidth
                  onClick={() => selectDiscussion(discussion.id)}>{discussion.name}
          </Button>

        </div>
        ))}
    </ScrollArea>
  </>
  )
}

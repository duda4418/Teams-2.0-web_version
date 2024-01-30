import { Avatar } from '@mantine/core'

export function ChatMessage({ value, userName, isMe }) {
  return (
      <div>
          {isMe ? (
              <div class="flex items-end mb-4">
                  <div class="flex items-end justify-end">
                      <div class="bg-teal-400 font-sans text-white px-3 py-1 rounded-xl max-w-xs">
                          {value}
                      </div>
                  </div>
              </div>
          ) : (
              <div class="flex items-end mb-4">
                  <div class="flex items-end">
                      <Avatar color="white" size="md" className="mr-3">
                          {userName.charAt(0).toUpperCase()}
                      </Avatar>
                      <div class="bg-orange-400 font-sans text-white px-3 py-1 rounded-xl max-w-xs">
                          {value}
                      </div>
                  </div>
              </div>
          )}
      </div>
  )
}
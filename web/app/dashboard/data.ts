interface Event {
    id: string,
    title: string,
    date: Date,
}

interface RecentActivity{
    id:string,
    description:string,
    timeStamp:Date,
    type:string
}

interface Source {
    activeRooms: number,
    totalParticipants: number,
    scheduledEvents: Event[],
    recentActivity:RecentActivity[]
}

const source: Source = {
    activeRooms: 2,
    totalParticipants: 256,
    scheduledEvents: [
        {
            id: '1',
            title: 'Product Strategy Meeting',
            date: new Date()
        },
        {
            id: '2',
            title: 'Design Workshop',
            date: new Date()
        }
    ],
    recentActivity:[
        {
            id: '1',
            description: 'Marketing Team Room created',
            timeStamp: new Date(),
            type:"room_created"
          },
          {
            id: '2',
            description: 'Sarah Johnson joined Design Room',
            timeStamp: new Date(),
            type:"room_joined"
          },
          {
            id: '3',
            description: 'Product Strategy Meeting scheduled',
            timeStamp: new Date(),
            type:"event_scheduled"
          }
    ]
}

export default source;
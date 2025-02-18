import React from 'react'
import {useState} from 'react'
import Case from './components/Case'
import Title from './components/Title'
import Card from './components/Card'


export default function App() {
    const [name, setName] = useState('PPLG')

  return (
    <Case>
    <div className='bg-gray-900 flex items-center flex-col min-h-screen pt-20'>
        <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg max-w-lg w-full p-6">
        <h4 className='text-white text-2xl'>Hello {name}</h4>
            <p className='text-lg text-gray-400 leading-relaxed'>A JavaScript library for building user interfaces</p>
      <Title name="Dashboard" page="Home" lang="React JS"></Title>
        </div>
              <Card judul="Produktif" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus beatae quidem accusamus aliquid temporibus fugiat obcaecati esse maxime repudiandae quam."></Card>
    </div>
    </Case>

  )
}
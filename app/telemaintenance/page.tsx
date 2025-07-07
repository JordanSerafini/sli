import React from 'react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import ISLInput from './ISLinput'

function Telemaintenance() {
  return (
    <Section background="subtle" padding="lg">
      <Container size="md">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            Télémaintenance
          </h1>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Connectez-vous rapidement et en sécurité à notre service de télémaintenance 
            pour obtenir une assistance technique à distance.
          </p>
        </div>
        <ISLInput />
      </Container>
    </Section>
  )
}

export default Telemaintenance
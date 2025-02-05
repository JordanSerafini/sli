export default function Services() {
  const services = [
    {
      title: "Maintenance",
      description: "Service de maintenance informatique pour entreprises",
      icon: "🖥️"
    },
    {
      title: "Développement",
      description: "Solutions sur mesure pour votre entreprise",
      icon: "⚙️"
    },
    {
      title: "Conseil",
      description: "Expertise et accompagnement personnalisé",
      icon: "💡"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
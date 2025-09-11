import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Snowboard, Mountain, Users, Award, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';

const Services = ({ t }) => {
  const services = [
    {
      icon: <Snowboard className="h-8 w-8 text-blue-600" />,
      title: t.services.lessons.title,
      description: t.services.lessons.description,
      features: t.services.lessons.features
    },
    {
      icon: <Mountain className="h-8 w-8 text-blue-600" />,
      title: t.services.private.title,
      description: t.services.private.description,
      features: t.services.private.features
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: t.services.group.title,
      description: t.services.group.description,
      features: t.services.group.features
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: t.services.experience.title,
      description: t.services.experience.description,
      features: t.services.experience.features
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.services.title}
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="md:flex items-center">
              <div className="md:flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                <Calendar className="h-12 w-12 text-blue-600 mx-auto" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t.booking.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t.booking.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a 
                    href="#booking" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {t.booking.cta}
                  </a>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {t.contact.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

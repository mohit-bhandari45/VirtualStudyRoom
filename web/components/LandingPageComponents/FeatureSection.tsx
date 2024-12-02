import { FC } from 'react';
import FeatureCard from './FeatureCard';
import { features } from '@/helpers/helpers';

const FeatureSection: FC = () => {
  return (
    <section className="bg-black text-white py-16 px-6">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold mb-4">Features</h2>
        <p className="text-gray-400 text-lg">
          Discover the powerful tools and features designed to make your virtual study experience productive, engaging, and enjoyable.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;

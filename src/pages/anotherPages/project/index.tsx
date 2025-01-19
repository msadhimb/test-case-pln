import Layout from '@/layout';
import React from 'react';

const Project = () => {
  return <div>Projects</div>;
};

export default Project;

Project.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;

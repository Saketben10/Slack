interface WorkSpaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = ({ params }: WorkSpaceIdPageProps) => {
  return (
    <div className="flex justify-center items-center">
      Id : {params.workspaceId}
    </div>
  );
};

export default WorkspaceIdPage;

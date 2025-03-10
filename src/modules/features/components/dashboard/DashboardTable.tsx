import ProfileFilterProvider from './profile-filter/ProfileFilterProvider';

const DashboardTable = () => {

    return(<>
        <ProfileFilterProvider>
            <ProfileFilterProvider.Filters />
            <ProfileFilterProvider.Tags />
            <ProfileFilterProvider.DataTable />
            <ProfileFilterProvider.Pagination />
        </ProfileFilterProvider>
    </>)
}

export default DashboardTable;
const Header = ({ title, userInitials }) => {
  return (
    <header className="dashboard-header flex h-16 items-center justify-between px-8">
      <h2 className="dashboard-title text-lg font-medium">{title}</h2>

      <div className="flex items-center gap-4">
        <div className="dashboard-avatar flex h-9 w-9 items-center justify-center rounded-full text-sm">
          {userInitials}
        </div>
      </div>
    </header>
  )
}

export default Header

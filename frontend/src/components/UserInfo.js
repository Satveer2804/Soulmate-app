import React from 'react';

const UserInfo = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        User Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Full Name
            </label>
            <p className="text-lg text-gray-800 font-medium">
              {user?.fullName || 'N/A'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Email Address
            </label>
            <p className="text-lg text-gray-800">
              {user?.email || 'N/A'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Phone Number
            </label>
            <p className="text-lg text-gray-800">
              {user?.phone || 'N/A'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Account Status
            </label>
            <div className="flex items-center">
              {user?.isVerified ? (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Verified
                </span>
              ) : (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Not Verified
                </span>
              )}
            </div>
          </div>
          
          {user?.isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Role
              </label>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Admin
              </span>
            </div>
          )}
        </div>
      </div>

      {user?.createdAt && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Member since: {new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;

















































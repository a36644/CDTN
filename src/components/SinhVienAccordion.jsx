/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const SinhVienAccordion = ({ sinhVien }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <tr onClick={toggleAccordion} className="cursor-pointer hover:bg-gray-100">
        <td className="py-2 px-4 border-b">{sinhVien.maSV}</td>
        <td className="py-2 px-4 border-b">{sinhVien.ten}</td>
        <td className="py-2 px-4 border-b">
          <button className="text-blue-500 hover:underline">Xem thông tin</button>
        </td>
      </tr>
      {isOpen && (
        <tr className="bg-gray-50">
          <td colSpan="3" className="py-2 px-4 border-b">
            <p><strong>Ngày sinh:</strong> {sinhVien.ngaySinh}</p>
            <p><strong>Email:</strong> {sinhVien.email}</p>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default SinhVienAccordion;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { joiCaseCreationValidationSchema } from '../../../hooks/validation';
import Button from '../../../components/Button';
import Form from '../../../components/Form';
import {
  CaseDataKey,
  CaseFormData,
  CaseParams,
  LawyersState,
} from '../../../constants/types';
import {
  InputFieldContainerStyle,
  RegisterButtonContainerStyle,
  RegisterButtonStyle,
  RegisterButtonTextStyle,
} from '../../../constants/styles';
import useHeader from '../../../hooks/ApiCalls';
import { fetchLawyersSuccess } from '../../../redux/lawyerSlice';
import Spinner from '../../../components/Spinner';

const createCaseParams: CaseParams[] = [
  {
    title: 'Case title',
    type: 'text',
    required: true,
    placeholder: 'Enter case title...',
    field: 'case_title',
  },
  {
    title: 'description',
    type: 'text',
    required: true,
    placeholder: 'Enter description...',
    field: 'description',
  },
];

const caseTypes = [
  { name: 'Civil', index: 1 },
  { name: 'Criminal', index: 2 },
  { name: 'Family', index: 3 },
  { name: 'Corporate', index: 4 },
  { name: 'Property', index: 5 },
];

const CreateCase = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLawyer, setSelectedLawyer] = useState('');
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [formInput, setFormInput] = useState<CaseFormData>({
    case_title: '',
    description: '',
  });
  const { clientId } = useParams();

  const { getTotalLawyers } = useHeader();

  const { lawyers } = useSelector(
    (state: { lawyer: LawyersState }) => state.lawyer
  );

  console.log(lawyers);

  const splittedLawyerNames = selectedLawyer?.split(' ');

  const lawyerId = lawyers?.filter(
    (lawyer) =>
      lawyer.first_name === splittedLawyerNames[0] &&
      lawyer.last_name === splittedLawyerNames[1]
  );

  console.log(lawyerId);

  const dispatch = useDispatch();

  const { createNewCase } = useHeader();

  const fetchLawyers = async () => {
    try {
      const lawyersResponse = await getTotalLawyers();

      dispatch(fetchLawyersSuccess(lawyersResponse));

      return;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    const { error } = joiCaseCreationValidationSchema.validate(formInput, {
      abortEarly: false,
    });

    if (error) {
      error.details.forEach((detail) => {
        toast.error(detail.message);
      });
      return;
    }
    if (selectedFiles) {
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });
    }

    if (!lawyerId[0]?._id) {
      toast.error('Please select a lawyer to continue');
      return;
    }

    if (!selectedCaseType) {
      toast.error('Please select a lawyer to continue');
      return;
    }
    const formDataObj = {
      ...formInput,
      lawyer_in_charge: lawyerId[0]?._id,
      case_type: selectedCaseType,
      client: clientId,
    };

    formData.append('info', JSON.stringify(formDataObj));
    setLoading(true);
    try {
      const { data } = await createNewCase(formData);

      if (data) {
        toast.success(data.message);
        console.log(data);
        navigate('/admin/cases/all');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLawyerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLawyer(e.target.value);
  };

  const handleCaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCaseType(e.target.value);
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const validFiles: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (/\.(pdf|doc|docx|txt|zip|rar)$/i.test(file.name)) {
          validFiles.push(file);
        } else {
          console.log(`File ${file.name} is not a valid document format.`);
        }
      }
      const filesToUpload = validFiles.slice(0, 20);

      setSelectedFiles(filesToUpload);
    } else {
      console.log('No valid document files selected.');
    }
  };

  const handleChange = (key: CaseDataKey, value: string) => {
    setFormInput((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex lg:justify-around md:gap-[100px] justify-center items-center md:px-10 lg:px-20 py-10">
          <form
            action=""
            className="lg:w-[30vw] md:w-[40vw] w-[50vw]"
            onSubmit={handleSubmit}
          >
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 30, duration: 1.5 }}
              initial={{ x: '100vw', opacity: 0 }}
            >
              <p className="uppercase text-3xl text-center font-bold underline">
                Case Creation
              </p>
              {createCaseParams.map((param) => (
                <div className="">
                  <Form
                    key={param.field}
                    title={param.title}
                    type={param.type}
                    required={param.required}
                    placeholder={param.placeholder}
                    value={formInput[param.field] || ''}
                    setValue={(value) => handleChange(param.field, value)}
                  />
                </div>
              ))}

              <div className="lg:w-[30vw] md:w-[40vw] w-[50vw] justify-center items-center flex flex-col">
                <select
                  name="lawyer"
                  id="lawyer"
                  className="mt-4 w-full border p-2"
                  value={selectedLawyer}
                  onChange={handleLawyerChange}
                >
                  <option value="" disabled className="">
                    Assign a lawyer to the case
                  </option>
                  {lawyers.map((lawyer, index) => (
                    <option
                      value={`${lawyer.first_name} ${lawyer.last_name}`}
                      key={index}
                      className=""
                    >
                      {`${lawyer.first_name} ${lawyer.last_name}`}
                    </option>
                  ))}
                </select>

                <select
                  name="case type"
                  id="case type"
                  className="mt-4 w-full border p-2"
                  value={selectedCaseType}
                  onChange={handleCaseChange}
                >
                  <option value="" disabled className="w-full">
                    Choose case type
                  </option>
                  {caseTypes.map((caseType, index) => (
                    <option
                      value={caseType.name}
                      key={index}
                      className="w-full"
                    >
                      {caseType.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            <div className={InputFieldContainerStyle}>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.zip,.rar"
                multiple
                onChange={handleDocumentChange}
              />
            </div>

            <Button
              title={'Create Case'}
              loading={loading}
              handleSubmit={handleSubmit}
              buttonStyle={RegisterButtonStyle}
              buttonContainerStyle={RegisterButtonContainerStyle}
              buttonTextStyle={RegisterButtonTextStyle}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default CreateCase;

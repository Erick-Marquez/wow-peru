import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import BaseUrl from './fetch/BaseUrl.js';
import moment from 'moment';

function App() {

  const [ users, setUsers ] = useState([])

  const [ openCreate, setOpenCreate ] = useState(false)
  const [ userCreate, setUserCreate ] = useState({})

  const [ openEdit, setOpenEdit ] = useState(false)
  const [ userEdit, setUserEdit ] = useState({})

  useEffect(() => {
    getUsers()
  }, [])

  function getUsers() {
    BaseUrl.get('api/users')
    .then((res) => {
      setUsers(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const createUser = () => {
    BaseUrl.get("sanctum/csrf-cookie")
    .then(() => {
      BaseUrl.post(`api/users`, userCreate)
      .then((res) => {
        getUsers()
        setOpenCreate(false)
        setUserCreate({})
      })
      .catch((err) => {
        console.log(err);
      })
    })
  }

  const showModalEdit = (rowData) => {
    setUserEdit({
      id: rowData.id,
      name: rowData.name,
      email: rowData.email,
      phone: rowData.phone,
      role: rowData.role,
      activation_date: moment(rowData.activation_date).format('YYYY-MM-DD'),
    })
    setOpenEdit(true)
  }
  const editUser = () => {
    BaseUrl.get("sanctum/csrf-cookie")
    .then(() => {
      BaseUrl.put(`api/users/${userEdit.id}`, userEdit)
      .then((res) => {
        getUsers()
        setOpenEdit(false)
        setUserEdit({})
      })
      .catch((err) => {
        console.log(err);
      })
    })
  }

  const deleteUser = (rowData) => {
    if (window.confirm(`Desea eliminar el usuario ${rowData.name}`)) {
      BaseUrl.get("sanctum/csrf-cookie")
      .then(() => {
        BaseUrl.delete(`api/users/${rowData.id}`)
        .then((res) => {
          getUsers()
        })
        .catch((err) => {
          console.log(err);
        })
      })
    }
  }


  return (
    <div className="App">
      <div className='flex justify-center my-8'>
        <div>
          <div className='mb-5'>
            <button 
              type='button' 
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
              onClick={() => {
                setOpenCreate(true)
              }}
            >
              Agregar
            </button>

            {/* Modal crear usuario */}
            <div class={`relative z-10 ${ openCreate ? '' : 'hidden' }`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

              <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div class="">
                        <div class="text-left">
                          <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Crear usuario</h3>
                          <div class="mt-2">
                            
                            <div className="">
                              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                  value={userCreate.name}
                                  onChange={(e) => {
                                    setUserCreate({
                                      ...userCreate,
                                      name: e.currentTarget.value
                                    })
                                  }}
                                />
                              </div>
                            </div>

                            <div className="">
                              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                              </label>
                              <div className="mt-2">
                                <input
                                  type="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                  value={userCreate.email}
                                  onChange={(e) => {
                                    setUserCreate({
                                      ...userCreate,
                                      email: e.currentTarget.value
                                    })
                                  }}
                                />
                              </div>
                            </div>

                            <div className="">
                              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Contraseña
                              </label>
                              <div className="mt-2">
                                <input
                                  type="password"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                  value={userCreate.password}
                                  onChange={(e) => {
                                    setUserCreate({
                                      ...userCreate,
                                      password: e.currentTarget.value
                                    })
                                  }}
                                />
                              </div>
                            </div>

                            <div className="">
                              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Telefono
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                  value={userCreate.phone}
                                  onChange={(e) => {
                                    setUserCreate({
                                      ...userCreate,
                                      phone: e.currentTarget.value
                                    })
                                  }}
                                />
                              </div>
                            </div>

                            <div className="">
                              <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                Rol
                              </label>
                              <div className="mt-2">
                                <select
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                  value={userCreate.role}
                                  onChange={(e) => {
                                    setUserCreate({
                                      ...userCreate,
                                      role: e.currentTarget.value
                                    })
                                  }}
                                >
                                  <option value="Rol1">Rol1</option>
                                  <option value="Rol2">Rol2</option>
                                  <option value="Rol3">Rol3</option>
                                </select>
                              </div>
                            </div>
                            

                            <div className="">
                              <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                                Fecha de activación
                              </label>
                              <div className="mt-2">
                                <input
                                  type="date"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                  value={userCreate.activation_date}
                                  onChange={(e) => {
                                    setUserCreate({
                                      ...userCreate,
                                      activation_date: e.currentTarget.value
                                    })
                                  }}
                                />
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button 
                        type="button" 
                        class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          createUser()
                        }}
                      >
                        Guardar
                      </button>
                      <button 
                        type="button" 
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => {
                          setOpenCreate(false)
                          setUserCreate({})
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <table className="border-collapse border border-slate-500 table-auto">
            <thead className="bg-slate-400">
              <tr>
                <th className="border border-slate-600 w-80">Nombre</th>
                <th className="border border-slate-600 w-80">Email</th>
                <th className="border border-slate-600 w-40">Telefono</th>
                <th className="border border-slate-600 w-20">Role</th>
                <th className="border border-slate-600 w-40">Fecha de activación</th>
                <th className="border border-slate-600 w-40">Acciones</th>
              </tr>
            </thead>
            <tbody className='bg-slate-200'>
              {users.map((u) => {
                return (
                  <>
                    <tr>
                      <td className="border border-slate-700">{u.name}</td>
                      <td className="border border-slate-700">{u.email}</td>
                      <td className="border border-slate-700">{u.phone}</td>
                      <td className="border border-slate-700">{u.role}</td>
                      <td className="border border-slate-700">{u.activation_date}</td>
                      <td className="border border-slate-700">
                        <button type='button' class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 mx-1 rounded" onClick={() => {showModalEdit(u)}}>
                          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px"><path d="M24 11l2.414-2.414c.781-.781.781-2.047 0-2.828l-2.172-2.172c-.781-.781-2.047-.781-2.828 0L19 6 24 11zM17 8L5.26 19.74C7.886 19.427 6.03 21.933 7 23c.854.939 3.529-.732 3.26 1.74L22 13 17 8zM4.328 26.944l-.015-.007c-.605.214-1.527-.265-1.25-1.25l-.007-.015L4 23l3 3L4.328 26.944z"/></svg>
                        </button>
                        <button type='button' class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mx-1 rounded" onClick={() => {deleteUser(u)}}>
                          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px"><path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"/></svg>
                        </button>
                      </td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </table>
            
          {/* Modal editar usuario */}
          <div class={`relative z-10 ${ openEdit ? '' : 'hidden' }`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div class="fixed inset-0 z-10 overflow-y-auto">
              <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="">
                      <div class="text-left">
                        <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Crear usuario</h3>
                        <div class="mt-2">
                          
                          <div className="">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                              Nombre
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                value={userEdit.name}
                                onChange={(e) => {
                                  setUserEdit({
                                    ...userEdit,
                                    name: e.currentTarget.value
                                  })
                                }}
                              />
                            </div>
                          </div>

                          <div className="">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                              Email
                            </label>
                            <div className="mt-2">
                              <input
                                type="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                value={userEdit.email}
                                onChange={(e) => {
                                  setUserEdit({
                                    ...userEdit,
                                    email: e.currentTarget.value
                                  })
                                }}
                              />
                            </div>
                          </div>

                          <div className="">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                              Telefono
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                value={userEdit.phone}
                                onChange={(e) => {
                                  setUserEdit({
                                    ...userEdit,
                                    phone: e.currentTarget.value
                                  })
                                }}
                              />
                            </div>
                          </div>

                          <div className="">
                            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                              Rol
                            </label>
                            <div className="mt-2">
                              <select
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                value={userEdit.role}
                                onChange={(e) => {
                                  setUserEdit({
                                    ...userEdit,
                                    role: e.currentTarget.value
                                  })
                                }}
                              >
                                <option value="Rol1">Rol1</option>
                                <option value="Rol2">Rol2</option>
                                <option value="Rol3">Rol3</option>
                              </select>
                            </div>
                          </div>
                          

                          <div className="">
                            <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                              Fecha de activación
                            </label>
                            <div className="mt-2">
                              <input
                                type="date"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                value={userEdit.activation_date}
                                onChange={(e) => {
                                  setUserEdit({
                                    ...userEdit,
                                    activation_date: e.currentTarget.value
                                  })
                                }}
                              />
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button 
                      type="button" 
                      class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        editUser()
                      }}
                    >
                      Guardar
                    </button>
                    <button 
                      type="button" 
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setOpenEdit(false)
                        setUserEdit({})
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

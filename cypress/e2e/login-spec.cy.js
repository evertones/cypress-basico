// Test case (1): Login page loads correctly
describe('The login page', () => {
  describe('The login page', () => {
      it('should display the page title equals the value set in the “Company Name” field from “System Details”', () => {
          cy
            .visit('https://everton.hound.redlounge.io')
            .title().should('eq', 'World Manager – 11.5 Platform')
      })
      it('should display the login form on the page', () => {
          cy
            .visit('https://everton.hound.redlounge.io')
            .get('.page-login > table td.headerBar')
            .should('have.text', 'Login')
      })
  })
})

// Test case (2): Login with an empty username and password
describe('The login page', () => {
    describe('when submitted without any data', () => {
        it('should display the error message “Please enter Username and Password”', () => {
          cy
            .visit('https://everton.hound.redlounge.io')
            .get('#loginbutton').click()
            .get('form[name="myform"] li.error').should('contain.text', 'Please enter Username and Password')
            .get('#username').should('have.value', '')
            .get('#password').should('have.value', '')
        })
        it.skip('should display the fields “Username” and “Password” empty', () => {
      })
    })
})

// Test case (3): Login with a valid username and empty password
describe('The login page', () => {
    describe('when submitted with a blank password', () => {
        it('should display the error message “Please enter Username and Password”', () => {
          cy
            .visit('https://everton.hound.redlounge.io')
            .get('#username').type('wm1')
            .get('#loginbutton').click()
            .get('form[name="myform"] li.error').should('contain.text', 'Please enter Username and Password')
            .get('#username').should('have.value', 'wm1')
            .get('#password').should('have.value', '')
        })
        it.skip('should display the “Username” field with the value entered for the username', () => {
        })
        it.skip('should display the “Password” field with the value empty', () => {
        })
    })
})

// Test case (4): Login with a valid username and incorrect password
describe('The login page', () => {
    describe('when submitted with an invalid password', () => {
        it('should display the error message “Incorrect Username or Password”', () => {
          cy
            .visit('https://everton.hound.redlounge.io')
            .get('#username').type('wm1')
            .get('#password').type('anything')
            .get('#loginbutton').click()
            .get('form[name="myform"] li.error').should('contain.text', 'Incorrect Username or Password')
            .get('#username').should('have.value', 'wm1')
            .get('#password').should('have.value', '')
        })
        it.skip('should display the “Username” field with the value entered for the username', () => {
        })
        it.skip('should display the “Password” field with the value empty', () => {
        })
    })
})

// Test case (5): Login with an empty username and correct password
describe('The login page', () => {
    describe('when submitted with an empty username', () => {
        it('should display the error message “Please enter Username and Password”', () => {
          cy
            .visit('https://everton.hound.redlounge.io')
            .get('#username').clear()
            .get('#password').type('wm1')
            .get('#loginbutton').click()
            .get('form[name="myform"] li.error').should('contain.text', 'Please enter Username and Password')
            .get('#username').should('have.value', '')
            .get('#password').should('have.value', '')
        })
        it.skip('should display the “Username” and “Password” fields with the value empty', () => {
        })
    })
})

// Test case (6): Login with valid details
describe('The login page', () => {
    describe('when submitted with valid credentials', () => {
        it('should navigate to the page with the title “Home Dashboard”', () => {
            cy
              .visit('https://everton.hound.redlounge.io')
              .get('#username').type('wm1')
              .get('#password').type('wm1')
              .get('#loginbutton').click()
              .get('h1 span.header-title').should('contain.text', 'Home Dashboard')
        })
    })
    describe('when the Account Panel is inspected', () => {
      it('should display the account name that matches the credentials used to log into the platform', () => {
          cy
            .visit('https://everton.hound.redlounge.io')
            .get('#username').type('wm1')
            .get('#password').type('wm1')
            .get('#loginbutton').click()
            .get('a[data-header-button="profile"]').click()
            .get('section.profile-details h1').contains('WM-01 World')
            
      })
  })
})

// Test case (7): Login with a deactivated account
describe('The login page', () => {
    describe('when submitted with a deactivated account', () => {
        it('should display the error message “Your account has become inactive, please contact your manager to have it reinstated.”', () => {
            cy
              .visit('https://everton.hound.redlounge.io')
              .get('#username').type('eiarea')
              .get('#password').type('eiarea')
              .get('#loginbutton').click()
              .get('form[name="myform"] li.error').should('contain.text', 'Your account has become inactive, please contact your manager to have it reinstated.')
              .get('#username').should('have.value', 'eiarea')
              .get('#password').should('have.value', '')

        })
        it.skip('should display the “Username” field with the value entered for the username', () => {
        })
        it.skip('should display the “Password” field with the value empty', () => {
        })
    })
})

// Test case (8): Login with a deleted account
describe('The login page', () => {
    describe('when submitted with a deleted account', () => {
        it('should display the error message “Your account has been deleted from this system, please contact your manager.”', () => {
            cy
              .visit('https://everton.hound.redlounge.io')
              .get('#username').type('markp')
              .get('#password').type('markp')
              .get('#loginbutton').click()
              .get('form[name="myform"] li.error').should('contain.text', 'Your account has been deleted from this system, please contact your manager')
              .get('#username').should('have.value', 'markp')
              .get('#password').should('have.value', '')
        })
        it.skip('should display the “Username” field with the value entered for the username', () => {
        })
        it.skip('should display the “Password” field with the value empty', () => {
        })
    })
})

// Test case (9): Logout successfully
describe('The logout button', () => {
    describe('when clicked', () => {
        it('should display the page title equals the value set in the “Company Name” field from “System Details”', () => {
            const updateQuery = `UPDATE wtmsettings SET value = 1 WHERE tag = 'system.config.security.autoLogin.enabled'`
                cy.log(updateQuery)
                cy.query(updateQuery).then(res => {
                    cy.log('Update => Rows affected: ' + res.affectedRows)
                });
          
          cy
            .visit('https://everton.hound.redlounge.io')
            .get('#username').type('wm1')
            .get('#password').type('wm1')
            .get('#loginbutton').click()
            .get('a[data-header-button="profile"]').click()
            .get('#profile-popup-panel a[data-header-button="logOut"]').click()
            .get('#username').should('have.value', '')
            .get('#password').should('have.value', '')
            .get('#staysignedin').should('be.visible')
        })
        it.skip('should display the login form on the page', () => {
        })
        it.skip('should display the checkbox “Stay signed in” not selected', () => {
        })
    })
})

// Test case (10): User remains logged out with SSI disabled
describe('The platform', () => {
    describe('set with the property Auto-Login disabled', () => {
        describe('when the user logs in', () => {
            it('should have the session cookie set to expire after the browser is closed', () => {
              const updateQuery = `UPDATE wtmsettings SET value = 1 WHERE tag = 'system.config.security.autoLogin.enabled'`
              cy.log(updateQuery)
              cy.query(updateQuery).then(res => {
                cy.log('Update => Rows affected: ' + res.affectedRows)
              });
              
              cy
                .visit('https://everton.hound.redlounge.io')
              
              const updateQuery2 = `UPDATE wtmsettings SET value = 0 WHERE tag = 'system.config.security.autoLogin.enabled'`
              cy.log(updateQuery2)
              cy.query(updateQuery2).then(res => {
                cy.log('Update => Rows affected: ' + res.affectedRows)
              });
              
              cy
                .clearCookies()
                .get('#username').type('wm1')
                .get('#password').type('wm1')
                .get('#loginbutton').click()
                .getCookie('staysignedin').then((cookie) => {
                    expect(cookie.value).to.equal('0')
                })
              
              cy.getCookie('SESSIONID').then((cookie) => {
                cy.log('cookie info: ' + cookie)
                cy.log('cookie info: ' + cookie.value)
                
                const deleteQuery = `DELETE FROM sessions WHERE sessionId = '` + cookie.value + `'`;
                cy.log(deleteQuery)
                cy.query(deleteQuery).then(res => {
                  expect(res.affectedRows).to.equal(1)
                  cy.log('Delete => Rows affected: ' + res.affectedRows)
                });
              })
              
              cy.clearCookie('SESSIONID')
                .get('a[data-header-button="home"]').click()
                .get('#username').should('have.value', '')
                .get('#password').should('have.value', '')
                .get('#staysignedin').should('not.exist')
            })
        })
        describe('when the session is cleaned up', () => {
            it.skip('should display the page title equals the value set in the “Company Name” field from “System Details”', () => {
            })
            it.skip('should display the login form on the page', () => {
            })
            it.skip('should NOT display the checkbox “Stay Signed In” on the page', () => {
            })
        })
    })
})

// Test case 11): User remains logged out with SSI enabled
describe('The platform', () => {
    describe('set with the property Auto-Login enabled', () => {
        describe('when the user logs in with the checkbox ”Stay Signed In” un-ticked', () => {
            it('should have the session cookie set to expire after the browser is closed', () => {
                cy
                    .visit('https://everton.hound.redlounge.io')
                    .get('#username').type('wm1')
                    .get('#password').type('wm1')
                    .get('#loginbutton').click()

                const updateQuery = `UPDATE wtmsettings SET value = 1 WHERE tag = 'system.config.security.autoLogin.enabled'`
                cy.log(updateQuery)
                cy.query(updateQuery).then(res => {
                    //expect(res.affectedRows).to.equal(1) 
                    cy.log('Update => Rows affected: ' + res.affectedRows)
                });

                cy
                    .getCookie('staysignedin').then((cookie) => {
                        expect(cookie.value).to.equal('0')
                    })


                cy.getCookie('SESSIONID').then((cookie) => {
                    cy.log('cookie info: ' + cookie)
                    cy.log('cookie info: ' + cookie.value)
                    
                    const deleteQuery = `DELETE FROM sessions WHERE sessionId = '` + cookie.value + `'`;
                    cy.log(deleteQuery)
                    cy.query(deleteQuery).then(res => {
                        expect(res.affectedRows).to.equal(1)
                        cy.log('Delete => Rows affected: ' + res.affectedRows)
                    });
                })

                cy.clearCookie('SESSIONID')
                    .get('a[data-header-button="home"]').click()
                    .get('#username').should('have.value', '')
                    .get('#password').should('have.value', '')
                    .get('#staysignedin').should('not.be.checked')
            })
        })
        describe('when the session is cleaned up', () => {
            it.skip('should display the page title equals the value set in the “Company Name” field from “System Details”', () => {
            })
            it.skip('should display the login form on the page', () => {
            })
            it.skip('should display the checkbox “Stay Signed In” on the page un-ticked', () => {
          })
      })
    })
})

// Test case (12): User remains logged in when SSI is used
describe('The platform', () => {
    describe('set with the property Auto-Login enabled', () => {
        describe('when the user logs in with the checkbox ”Stay Signed In” ticked', () => {
            it('should have the session cookie set to expire after N days', () => {
              cy
              .visit('https://everton.hound.redlounge.io')
              .get('#username').type('wm1')
              .get('#password').type('wm1')
              .get('#staysignedin').check()
              .get('#loginbutton').click()

              cy
                  .getCookie('staysignedin').then((cookie) => {
                      expect(cookie.value).to.equal('1')
                  })
            })
        })
    })
})

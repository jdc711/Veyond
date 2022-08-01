!macro customInstall
  DetailPrint "Register vymv URI Handler"
  DeleteRegKey HKCR "vymv"
  WriteRegStr HKCR "vymv" "" "URL:vymv"
  WriteRegStr HKCR "vymv" "URL Protocol" ""
  WriteRegStr HKCR "vymv\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
  WriteRegStr HKCR "vymv\shell" "" ""
  WriteRegStr HKCR "vymv\shell\open" "" ""
  WriteRegStr HKCR "vymv\shell\open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend
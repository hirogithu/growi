import { VFC } from 'react';

import {
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { Attachment } from '~/interfaces/page';

import UserPicture from '../../client/js/components/User/UserPicture';
import { Username } from '~/components/User/Username';

type Props = {
  isOpen: boolean,
  onClose:() => void,
  attachmentToDelete: Attachment,
};


export const DeleteAttachmentModal:VFC<Props> = (props: Props) => {
  const { attachmentToDelete } = props;


  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.onClose}
      animation="false"
      className="attachment-delete-modal"
      bssize="large"
      aria-labelledby="contained-modal-title-lg"
    >
      <ModalHeader tag="h4" toggle={props.onClose} className="bg-danger text-light">
        <span id="contained-modal-title-lg">Delete attachment?</span>
      </ModalHeader>
      <ModalBody>
        <div className="attachment-delete-image">
          {/* <p>
            <i className={this.iconNameByFormat(attachmentToDelete.fileFormat)}></i> {attachmentToDelete.originalName}
          </p> */}
          <p>
            uploaded by{' '}
            <UserPicture user={attachmentToDelete.creator} size="sm" />{' '}
            <Username user={attachmentToDelete.creator} />
          </p>
          {(attachmentToDelete.fileFormat.match(/image\/.+/i)) && <img src={attachmentToDelete.filePathProxied} alt="deleting image" />}
        </div>
      </ModalBody>
      <ModalFooter>
        {/* <div className="mr-3 d-inline-block">
          {deletingIndicator}
        </div> */}
        {/* <button
          type="button"
          className="btn btn-danger"
          onClick={this._onDeleteConfirm}
          disabled={this.props.deleting}
        >
          Delete!
        </button> */}
      </ModalFooter>
    </Modal>
  );
};
// export const  DeleteAttachmentModal = {

//   constructor(props) {
//     super(props);

//     this._onDeleteConfirm = this._onDeleteConfirm.bind(this);
//   }

//   _onDeleteConfirm() {
//     this.props.onAttachmentDeleteClickedConfirm(this.props.attachmentToDelete);
//   }

//   iconNameByFormat(format) {
//     if (format.match(/image\/.+/i)) {
//       return 'icon-picture';
//     }

//     return 'icon-doc';
//   }

//   renderByFileFormat(attachment) {
//     const content = (attachment.fileFormat.match(/image\/.+/i))
//       ? <img src={attachment.filePathProxied} alt="deleting image" />
//       : '';


//     return (
//       <div className="attachment-delete-image">
//         <p>
//           <i className={this.iconNameByFormat(attachment.fileFormat)}></i> {attachment.originalName}
//         </p>
//         <p>
//           uploaded by <UserPicture user={attachment.creator} size="sm"></UserPicture> <Username user={attachment.creator}></Username>
//         </p>
//         {content}
//       </div>
//     );
//   }

//   render() {
//     const attachment = this.props.attachmentToDelete;
//     if (attachment === null) {
//       return null;
//     }

//     const props = Object.assign({}, this.props);
//     delete props.onAttachmentDeleteClickedConfirm;
//     delete props.attachmentToDelete;
//     delete props.inUse;
//     delete props.deleting;
//     delete props.deleteError;

//     let deletingIndicator = '';
//     if (this.props.deleting) {
//       deletingIndicator = <div className="speeding-wheel-sm"></div>;
//     }
//     if (this.props.deleteError) {
//       deletingIndicator = <span>{this.props.deleteError}</span>;
//     }

//     const renderAttachment = this.renderByFileFormat(attachment);

//     return (
//       <Modal {...props} className="attachment-delete-modal" bssize="large" aria-labelledby="contained-modal-title-lg">
//         <ModalHeader tag="h4" toggle={this.props.toggle} className="bg-danger text-light">
//           <span id="contained-modal-title-lg">Delete attachment?</span>
//         </ModalHeader>
//         <ModalBody>
//           {renderAttachment}
//         </ModalBody>
//         <ModalFooter>
//           <div className="mr-3 d-inline-block">
//             {deletingIndicator}
//           </div>
//           <Button
//             color="danger"
//             onClick={this._onDeleteConfirm}
//             disabled={this.props.deleting}
//           >Delete!
//           </Button>
//         </ModalFooter>
//       </Modal>
//     );
//   }

// }

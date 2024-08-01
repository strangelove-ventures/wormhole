// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: wormchain/wormhole/sequence_counter.proto

package types

import (
	fmt "fmt"
	proto "github.com/cosmos/gogoproto/proto"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type SequenceCounter struct {
	Index    string `protobuf:"bytes,1,opt,name=index,proto3" json:"index,omitempty"`
	Sequence uint64 `protobuf:"varint,2,opt,name=sequence,proto3" json:"sequence,omitempty"`
}

func (m *SequenceCounter) Reset()         { *m = SequenceCounter{} }
func (m *SequenceCounter) String() string { return proto.CompactTextString(m) }
func (*SequenceCounter) ProtoMessage()    {}
func (*SequenceCounter) Descriptor() ([]byte, []int) {
	return fileDescriptor_ebba1d08bd6de1aa, []int{0}
}
func (m *SequenceCounter) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *SequenceCounter) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_SequenceCounter.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *SequenceCounter) XXX_Merge(src proto.Message) {
	xxx_messageInfo_SequenceCounter.Merge(m, src)
}
func (m *SequenceCounter) XXX_Size() int {
	return m.Size()
}
func (m *SequenceCounter) XXX_DiscardUnknown() {
	xxx_messageInfo_SequenceCounter.DiscardUnknown(m)
}

var xxx_messageInfo_SequenceCounter proto.InternalMessageInfo

func (m *SequenceCounter) GetIndex() string {
	if m != nil {
		return m.Index
	}
	return ""
}

func (m *SequenceCounter) GetSequence() uint64 {
	if m != nil {
		return m.Sequence
	}
	return 0
}

func init() {
	proto.RegisterType((*SequenceCounter)(nil), "wormchain.wormhole.SequenceCounter")
}

func init() {
	proto.RegisterFile("wormchain/wormhole/sequence_counter.proto", fileDescriptor_ebba1d08bd6de1aa)
}

var fileDescriptor_ebba1d08bd6de1aa = []byte{
	// 184 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0xd2, 0x2c, 0xcf, 0x2f, 0xca,
	0x4d, 0xce, 0x48, 0xcc, 0xcc, 0xd3, 0x07, 0xb1, 0x32, 0xf2, 0x73, 0x52, 0xf5, 0x8b, 0x53, 0x0b,
	0x4b, 0x53, 0xf3, 0x92, 0x53, 0xe3, 0x93, 0xf3, 0x4b, 0xf3, 0x4a, 0x52, 0x8b, 0xf4, 0x0a, 0x8a,
	0xf2, 0x4b, 0xf2, 0x85, 0x84, 0xe0, 0x4a, 0xf5, 0x60, 0x4a, 0x95, 0x9c, 0xb9, 0xf8, 0x83, 0xa1,
	0xaa, 0x9d, 0x21, 0x8a, 0x85, 0x44, 0xb8, 0x58, 0x33, 0xf3, 0x52, 0x52, 0x2b, 0x24, 0x18, 0x15,
	0x18, 0x35, 0x38, 0x83, 0x20, 0x1c, 0x21, 0x29, 0x2e, 0x0e, 0x98, 0xb1, 0x12, 0x4c, 0x0a, 0x8c,
	0x1a, 0x2c, 0x41, 0x70, 0xbe, 0x53, 0xf0, 0x89, 0x47, 0x72, 0x8c, 0x17, 0x1e, 0xc9, 0x31, 0x3e,
	0x78, 0x24, 0xc7, 0x38, 0xe1, 0xb1, 0x1c, 0xc3, 0x85, 0xc7, 0x72, 0x0c, 0x37, 0x1e, 0xcb, 0x31,
	0x44, 0x59, 0xa6, 0x67, 0x96, 0x64, 0x94, 0x26, 0xe9, 0x25, 0xe7, 0xe7, 0xc2, 0x9d, 0xa7, 0x9b,
	0x96, 0x5f, 0x9a, 0x97, 0x92, 0x58, 0x92, 0x99, 0x0f, 0x71, 0x32, 0xc4, 0xf1, 0x15, 0x08, 0xe7,
	0x97, 0x54, 0x16, 0xa4, 0x16, 0x27, 0xb1, 0x81, 0x1d, 0x6d, 0x0c, 0x08, 0x00, 0x00, 0xff, 0xff,
	0xd5, 0x7a, 0xa7, 0x65, 0xe1, 0x00, 0x00, 0x00,
}

func (m *SequenceCounter) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *SequenceCounter) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *SequenceCounter) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Sequence != 0 {
		i = encodeVarintSequenceCounter(dAtA, i, uint64(m.Sequence))
		i--
		dAtA[i] = 0x10
	}
	if len(m.Index) > 0 {
		i -= len(m.Index)
		copy(dAtA[i:], m.Index)
		i = encodeVarintSequenceCounter(dAtA, i, uint64(len(m.Index)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintSequenceCounter(dAtA []byte, offset int, v uint64) int {
	offset -= sovSequenceCounter(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *SequenceCounter) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Index)
	if l > 0 {
		n += 1 + l + sovSequenceCounter(uint64(l))
	}
	if m.Sequence != 0 {
		n += 1 + sovSequenceCounter(uint64(m.Sequence))
	}
	return n
}

func sovSequenceCounter(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozSequenceCounter(x uint64) (n int) {
	return sovSequenceCounter(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *SequenceCounter) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowSequenceCounter
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: SequenceCounter: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: SequenceCounter: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Index", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowSequenceCounter
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthSequenceCounter
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthSequenceCounter
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Index = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Sequence", wireType)
			}
			m.Sequence = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowSequenceCounter
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Sequence |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		default:
			iNdEx = preIndex
			skippy, err := skipSequenceCounter(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthSequenceCounter
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipSequenceCounter(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowSequenceCounter
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowSequenceCounter
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowSequenceCounter
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthSequenceCounter
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupSequenceCounter
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthSequenceCounter
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthSequenceCounter        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowSequenceCounter          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupSequenceCounter = fmt.Errorf("proto: unexpected end of group")
)
